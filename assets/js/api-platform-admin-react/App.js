import React, { Component } from 'react'
import { HydraAdmin, hydraClient, fetchHydra } from '@api-platform/admin'
import { authClient, initToken } from './authClient'
import { host, apiPlatformPrefix } from '../lib/config'

const entrypoint = `//${host}${apiPlatformPrefix}`

const fetchWithAuth = (url, options = {}) => {
    if (!options.headers) options.headers = new Headers({ Accept: 'application/ld+json' });

    options.credentials = 'same-origin'

    return fetchHydra(url, options);
};

const restClient = (api) => (hydraClient(api, fetchWithAuth));

export default class extends Component {
    componentWillMount() {
        initToken()
    }

    render() {
        return <HydraAdmin entrypoint={entrypoint} restClient={restClient} authClient={authClient}/>
    }
}
