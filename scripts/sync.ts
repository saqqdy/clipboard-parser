import { execSync } from 'child_process'

execSync(
	'curl -X PUT -d "sync_upstream=true" "https://registry-direct.npmmirror.com/clipboard-parser/sync"'
)
