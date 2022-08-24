import { execSync } from 'child_process'
let [, , versionText] = process.argv

if (!versionText) process.exit(1)
versionText = versionText.replace(/\"/g, '')
const versions = versionText.split(',')

const REGISTRY_URL = 'https://registry.npmjs.org'
const command = `npm --registry=${REGISTRY_URL} unpublish`

for (const version of versions) {
	execSync(`${command} clipboard-parser@${version}`, {
		stdio: 'inherit'
	})
	console.info(`UnPublished clipboard-parser@${version}`)
}
