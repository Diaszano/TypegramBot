interface iJobConfig {
  redis: {
    port: number;
    host: string;
    password: string | undefined;
  };
}

const jobConfig: iJobConfig = {
  redis: {
    port: parseInt(process.env.CACHE_PORT || '6379'),
    host: process.env.CACHE_HOST || '127.0.0.1',
    password: process.env.CACHE_PASS,
  },
};

export default jobConfig;
