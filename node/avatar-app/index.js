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

// The ID of the slash command "/about".
// It's not enabled by default, set to the actual ID to enable it. You need to
// use the same ID as set in the Google Chat API configuration.
const ABOUT_COMMAND_ID = null;

// [START chat_avatar_app]

/**
 * Google Cloud Function that responds to messages sent from a
 * Google Chat space.
 *
 * @param {Object} req Request sent from Google Chat space
 * @param {Object} res Response to send back
 */
exports.avatarApp = function avatarApp(req, res) {
  if (req.method === 'GET' || !req.body.message) {
    return res.send('Hello! This function is meant to be used ' +
      'in a Google Chat Space.');
  }

  // Stores the Google Chat event as a variable.
  var event = req.body;

  // [START chat_avatar_slash_command]
  // Checks for the presence of a slash command in the message.
  if (event.message.slashCommand) {
    // Executes the slash command logic based on its ID.
    // Slash command IDs are set in the Google Chat API configuration.
    switch (event.message.slashCommand.commandId) {
      case ABOUT_COMMAND_ID:
        return res.send({
          text: 'The Avatar app replies to Google Chat messages.'
        });
    }
  }
  // [END chat_avatar_slash_command]

  const sender = req.body.message.sender.displayName;
  const image = req.body.message.sender.avatarUrl;
  const data = createMessage(sender, image);
  res.send(data);
};

/**
 * Creates a card with two widgets.
 * 
 * @param {string} displayName the sender's display name
 * @param {string} imageUrl the URL for the sender's avatar
 * @return {Object} a card with the user's avatar.
 */
function createMessage(displayName, imageUrl) {
  const avatarSection = ;

  return {
    text: 'Here\'s your avatar',
    cardsV2: [{
      cardId: 'avatarCard',
      card: {
        name: 'Avatar Card',
        header: {
          title: `Hello ${displayName}!`,
        },
        sections: [{ widgets: [{
          textParagraph: { text: 'Your avatar picture: ' }
        }, {
          image: {imageUrl}
        }]}]
      }
    }]
  };
}
// [END chat_avatar_app]
