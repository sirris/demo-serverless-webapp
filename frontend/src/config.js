import awsmobile from './aws-exports';

const config = {
  apiGateway: {
    REGION: awsmobile.aws_project_region,
    URL: awsmobile.aws_cloud_logic_custom[0].endpoint,
  },
  cognito: {
    REGION: awsmobile.aws_project_region,
    USER_POOL_ID: awsmobile.aws_user_pools_id,
    APP_CLIENT_ID: awsmobile.aws_user_pools_web_client_id,
    IDENTITY_POOL_ID: awsmobile.aws_cognito_identity_pool_id,
  },
};

export default config;
