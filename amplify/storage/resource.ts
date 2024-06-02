import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
    name: 'myTestStorage',
    access: (allow) => ({
        'audio_files/*': [
        allow.guest.to(['read']),
        allow.entity('identity').to(['read', 'write', 'delete'])
        ],
    })
    });