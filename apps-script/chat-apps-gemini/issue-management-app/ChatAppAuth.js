/**
 * Copyright 2024 Google LLC
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This script contains utilities functions based on app authentication.

/**
 * Creates a new message by using the Advanced Chat Service.
 * 
 * @param {Object} message the message object to send to Google Chat
 * @param {string} spaceId the space ID where to create the message
 */
function createAppMessageUsingChatService(message, spaceId) {
  Chat.Spaces.Messages.create(message, spaceId, {}, {
    'Authorization': 'Bearer ' + getService_().getAccessToken()
  });
}

/**
 * Creates a new message by using the REST API.
 * 
 * @param {Object} message the message object to send to Google Chat
 * @param {string} spaceId the space ID where to create the message
 */
function createAppMessageUsingRest(message, spaceId) {
  UrlFetchApp.fetch(`https://chat.googleapis.com/v1/${spaceId}/messages`, {
    method: "POST",
    contentType: "application/json",
    headers: { "Authorization": "Bearer " + getService_().getAccessToken() },
    payload: JSON.stringify(message)
  });
}

/**
 * Authenticates the app service by using the OAuth2 library.
 * 
 * Warning: This example uses a service account private key for simplicity's sake, it should always
 * be stored in an secure location.
 * 
 * @return {Object} the authenticated app service
 */
function getService_() {
  const CHAT_CREDENTIALS = {
    // Replace with the Google Chat credentials to use for app authenticatio, the service account
    // private key's JSON.
  }

  return OAuth2.createService("chat-app@apps-script-chat-app-400918.iam.gserviceaccount.com")
    .setTokenUrl(CHAT_CREDENTIALS.token_uri)
    .setPrivateKey(CHAT_CREDENTIALS.private_key)
    .setIssuer(CHAT_CREDENTIALS.client_email)
    .setSubject(CHAT_CREDENTIALS.client_email)
    .setScope('https://www.googleapis.com/auth/chat.bot')
    .setPropertyStore(appProperties);
}