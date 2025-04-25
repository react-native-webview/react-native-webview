# Versioning and Publishing Packages

We use Changesets for versioning and GitHub Actions for publishing. The process is as follows:

1. After making changes, create a changeset locally:

   ```
   yarn changeset
   ```

2. Follow the prompts to describe your changes and select the appropriate version bump.
3. Commit the generated changeset file along with your code changes.

4. Push your changes and open a pull request:

   ```
   git push
   ```

5. The pull request should contain your code changes and the new changeset file(s).

6. Once the pull request is merged to the main branch, the CI/CD pipeline (GitHub Actions) will automatically:

   - Create a new "Version Packages" pull request that includes version bumps and changelog updates

7. Review the "Version Packages" pull request:

   - Check that the version bumps and changelog entries are correct
   - Make any necessary adjustments
   - Approve the pull request

8. Merge the "Version Packages" pull request:

   - This triggers the publish workflow

9. The publish workflow will automatically:
   - Publish the updated packages to our npm registry
   - Push the new version tags to the repository