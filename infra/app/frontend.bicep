param name string
param location string = resourceGroup().location
param tags object = {}

@description('Repository URL for the frontend source code')
param repositoryUrl string

@description('Branch to deploy from')
param branch string = 'main'

@description('Location of built frontend artifacts')
param appArtifactLocation string

resource staticSite 'Microsoft.Web/staticSites@2022-03-01' = {
  name: name
  tags: union(tags, {'azd-service-name':  'frontend' })
  location: location
  sku: {
    name: 'Standard'
    tier: 'Standard'
  }
  properties: {
    repositoryUrl: repositoryUrl
    branch: branch
    buildProperties: {
      appLocation: '/'
      apiLocation: ''
      appArtifactLocation: appArtifactLocation
    }
  }
}

output staticSiteEndpoint string = staticSite.properties.defaultHostname
