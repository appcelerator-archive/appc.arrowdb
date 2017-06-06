#!groovy
@Library('pipeline-library') _

timestamps {
	node('git && (osx || linux) && !master') {
		stage('Checkout') {
			checkout scm
		}

		stage('Configuration') {
			sh "echo \"module.exports = { logLevel: 'error', connectors: { 'appc.arrowdb': { requireSessionLogin: false, key: 'sX5SETgQP9470gddvEIBrgmiQS9p7TPd', username: 'jenkins', password: 'jenkins1234', generateModelsFromSchema: true, modelAutogen: true, batchOperationsEnabled: true } } };\" > conf/local.js"
		}

		buildConnector {
			// don't override anything yet
		}
	}
}
