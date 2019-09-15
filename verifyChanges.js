const fs = require('fs');
const { JupiterOneChangeManagementClient } = require('@jupiterone/jupiter-change-management-client');

(async function() {
  const jupiterOneAccount = process.argv[2];
  const jupiterOneIntegrationInstanceId = process.argv[3];

  const commitRange = process.env.TRAVIS_COMMIT_RANGE;
  const fullRepoSlug = process.env.TRAVIS_REPO_SLUG;
  const [base, head] = commitRange.split("...");
  const [username, repoSlug] = fullRepoSlug.split("/");

  let j1Token;
  try {
    j1Token = fs.readFileSync("./jupiter-one-api-token.txt", { encoding: 'utf-8' }).trim();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  const cmClient = await new JupiterOneChangeManagementClient(
    jupiterOneAccount,
    jupiterOneIntegrationInstanceId,
    j1Token
  ).init();
  console.log("Initialized client!");

  await cmClient.collectPREntities(
    [
      {
        username,
        repoSlug,
        sha: head
      }
    ],
    [
      {
        username,
        repoSlug,
        sha: base
      }
    ]
  );
  console.log("Collected entities!");

  const reviewProcessVerdict = cmClient.buildReviewProcessComment();

  console.log(reviewProcessVerdict.text);

  if (reviewProcessVerdict.verdict === "NEEDS_HUMAN_REVIEW") {
    throw "Needs human review!";
  }
})().then(() => {
  console.log("Changes verified!");
  process.exit(0);
}).catch((reason) => {
  console.log(`Failed! ${reason}`);
  process.exit(1);
});

