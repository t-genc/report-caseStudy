export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
        EXPO_PUBLIC_ACCESS_KEY: string;
        EXPO_PUBLIC_SECRET_KEY: string;
        EXPO_PUBLIC_BUCKET_NAME: string;
        EXPO_PUBLIC_AWS_REGION: string;
        EXPO_PUBLIC_GOOOGLE_MAP_API_KEY: string;
        EXPO_PUBLIC_AUTH_CODE: string;
        EXPO_PUBLIC_PHONE_NUMBER: string;
        EXPO_PUBLIC_API_URL: string;

    }
  }
}
