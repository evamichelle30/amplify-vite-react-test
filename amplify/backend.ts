import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { Stack } from "aws-cdk-lib";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";

const backend = defineBackend({
  auth,
  data,
  storage
});

// The actions included below cover all supported ML capabilities
backend.auth.resources.authenticatedUserIamRole.addToPrincipalPolicy(
  new PolicyStatement({
    actions: [
      "transcribe:StartStreamTranscriptionWebSocket",
    ],
    resources: ["*"],
  })
);

const region = Stack.of(backend.auth.resources.unauthenticatedUserIamRole).region;

// Ensure the region is defined
if (!region) {
  throw new Error("Region is not defined. Please check your configuration.");
}

backend.addOutput({
  custom: {
    Predictions: {
      convert: {
        translateText: {
          defaults: {
            sourceLanguage: "en",
            targetLanguage: "es",
          },
          proxy: false,
          region: Stack.of(backend.auth.resources.unauthenticatedUserIamRole)
            .region,
        },
        speechGenerator: {
          defaults: {
            voiceId: "Ivy",
          },
          proxy: false,
          region: Stack.of(backend.auth.resources.unauthenticatedUserIamRole)
            .region,
        },
        transcription: {
          defaults: {
            language: "en-US",
          },
          proxy: false,
          region: Stack.of(backend.auth.resources.unauthenticatedUserIamRole)
            .region,
        },
      },
      identify: {
        identifyEntities: {
          defaults: {
            collectionId: "default",
            maxEntities: 10,
          },
          celebrityDetectionEnabled: true,
          proxy: false,
          region: Stack.of(backend.auth.resources.unauthenticatedUserIamRole)
            .region,
        },
        identifyLabels: {
          defaults: {
            type: "ALL",
          },
          proxy: false,
          region: Stack.of(backend.auth.resources.unauthenticatedUserIamRole)
            .region,
        },
        identifyText: {
          defaults: {
            format: "ALL",
          },
          proxy: false,
          region: Stack.of(backend.auth.resources.unauthenticatedUserIamRole)
            .region,
        },
      },
      interpret: {
        interpretText: {
          defaults: {
            type: "ALL",
          },
          proxy: false,
          region: Stack.of(backend.auth.resources.unauthenticatedUserIamRole)
            .region,
        },
      },
    },
  },
});