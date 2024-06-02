import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
    name: 'myTestStorage',
    access: (allow) => ({
        'audio_files/{entity_id}/*': [
        allow.guest.to(['read']),
        allow.entity('identity').to(['read', 'write', 'delete'])
        ],
        'audio_files/*': [
        allow.authenticated.to(['read','write']),
        allow.guest.to(['read', 'write'])
        ],
    })
    });