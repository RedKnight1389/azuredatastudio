/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Account } from 'azdata';
import { ServiceClientCredentials } from '@azure/ms-rest-js';
import { SubscriptionClient } from '@azure/arm-subscriptions';

import { azureResource } from '../azure-resource';
import { IAzureResourceSubscriptionService } from '../interfaces';

export class AzureResourceSubscriptionService implements IAzureResourceSubscriptionService {
	public async getSubscriptions(account: Account, credential: ServiceClientCredentials): Promise<azureResource.AzureResourceSubscription[]> {
		const subscriptions: azureResource.AzureResourceSubscription[] = [];

		const subClient = new SubscriptionClient(credential);
		const subs = await subClient.subscriptions.list();
		subs.forEach((sub) => subscriptions.push({
			id: sub.subscriptionId,
			name: sub.displayName
		}));

		return subscriptions;
	}
}
