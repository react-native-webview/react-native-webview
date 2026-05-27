#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function findFile(dir, name) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const r = findFile(full, name);
      if (r) return r;
    } else if (entry.name === name) return full;
  }
  return null;
}

const genCpp = findFile('node_modules/.generated/windows', 'AutolinkedNativeModules.g.cpp');
if (!genCpp) {
  console.error('::error::AutolinkedNativeModules.g.cpp not found');
  process.exit(1);
}
console.log('Generated dir:', path.dirname(genCpp));

// 1. Write autolink cpp with webview registration
fs.writeFileSync(genCpp, `// clang-format off
#include "pch.h"
#include "AutolinkedNativeModules.g.h"

#include <winrt/ReactNativeWebView.h>

namespace winrt::Microsoft::ReactNative {

void RegisterAutolinkedNativeModulePackages(winrt::Windows::Foundation::Collections::IVector<winrt::Microsoft::ReactNative::IReactPackageProvider> const& packageProviders)
{
    packageProviders.Append(winrt::ReactNativeWebView::ReactPackageProvider());
}

}
`);
console.log('Wrote AutolinkedNativeModules.g.cpp');

// 2. Add project reference to vcxproj
const vcxproj = findFile('node_modules/.generated/windows', 'ReactApp.vcxproj');
if (!vcxproj) {
  console.error('::error::ReactApp.vcxproj not found');
  process.exit(1);
}
const webviewProj = path.join('node_modules', 'react-native-webview', 'windows', 'ReactNativeWebView', 'ReactNativeWebView.vcxproj');
const relPath = path.relative(path.dirname(vcxproj), webviewProj).split('/').join('\\');

let vcxContent = fs.readFileSync(vcxproj, 'utf8');
if (!vcxContent.includes('ReactNativeWebView')) {
  const projRef = `  <ItemGroup>
    <ProjectReference Include="$(ProjectDir)${relPath}">
      <Project>{30CADFC7-80EF-4296-A405-47E4B97C0C71}</Project>
    </ProjectReference>
  </ItemGroup>
`;
  vcxContent = vcxContent.replace('</Project>', projRef + '</Project>');
  fs.writeFileSync(vcxproj, vcxContent);
  console.log('Added ProjectReference to', path.basename(vcxproj));
}

// 3. Add webview project to solution
const sln = path.join('windows', 'WebviewExample.sln');
let slnContent = fs.readFileSync(sln, 'utf8');
if (!slnContent.includes('ReactNativeWebView')) {
  const slnRelPath = path.relative('windows', webviewProj).split('/').join('\\');
  const projEntry = `Project("{8BC9CEB8-8B4A-11D0-8D11-00A0C91BC942}") = "ReactNativeWebView", "${slnRelPath}", "{30CADFC7-80EF-4296-A405-47E4B97C0C71}"\r\nEndProject\r\n`;
  slnContent = slnContent.replace(/Global\r?\n/, projEntry + 'Global\n');

  const configs = [
    '\t\t{30CADFC7-80EF-4296-A405-47E4B97C0C71}.Debug|x64.ActiveCfg = Debug|x64',
    '\t\t{30CADFC7-80EF-4296-A405-47E4B97C0C71}.Debug|x64.Build.0 = Debug|x64',
    '\t\t{30CADFC7-80EF-4296-A405-47E4B97C0C71}.Release|x64.ActiveCfg = Release|x64',
    '\t\t{30CADFC7-80EF-4296-A405-47E4B97C0C71}.Release|x64.Build.0 = Release|x64',
    '',
  ].join('\r\n');

  slnContent = slnContent.replace(
    /(\t*EndGlobalSection\r?\n\t*GlobalSection\(SolutionProperties\))/,
    configs + '$1'
  );

  fs.writeFileSync(sln, slnContent);
  console.log('Added ReactNativeWebView to solution');
}

// Show results
console.log('\n=== Solution projects ===');
slnContent.split(/\r?\n/).filter(l => l.startsWith('Project(')).forEach(l => console.log(l));
console.log('\n=== AutolinkedNativeModules.g.cpp ===');
console.log(fs.readFileSync(genCpp, 'utf8'));
