interface Window {
  env: {
    NG_APP_API_URL?: string;
    [key: string]: string | undefined; // Allow additional properties if needed
  };
}
