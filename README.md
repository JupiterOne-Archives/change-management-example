# JupiterOne Change Management Example

This project exemplifies usage of the [JupiterOne change management
client](https://github.com/JupiterOne/change-management-client) in a CICD
pipeline by regulating changes to itself.

For more information on how JupiterOne can protect your production environment
from malicious, vulnerable, or unreviewed code, please check out the [JupiterOne
documentation](https://support.jupiterone.io/hc/en-us/articles/360022721934-Detect-Suspicious-Code-Commits).

## Prerequisites

To obtain a JupiterOne API token, you'll first need a JupiterOne account. Start
your free trial at [jupiterone.com](https://jupiterone.com)!

Utilizing the code review features of JupiterOne requires a version control
integration that supports the feature. Currently, JupiterOne has integrations
with Bitbucket and GitHub. To set up one of these integrations, follow the
[integration "Getting Started"
instructions](https://support.jupiterone.io/hc/en-us/articles/360022884813-1-9-Configure-Integrations)
on the support site.

Once you have an account, you can create an API token. The JupiterOne support
site has [detailed
instructions](https://support.jupiterone.io/hc/en-us/articles/360025847594-Enable-API-Key-Access).

You obviously don't want to commit this key to your repository, so you'll need
to encrypt it. Travis makes this easy with its `encrypt-file` command. Read more
about it in the [Travis documentation](https://docs.travis-ci.com/user/encrypting-files/).
