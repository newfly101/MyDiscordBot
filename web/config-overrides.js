const { override, overrideDevServer } = require('customize-cra');

const devServerConfig = () => config => {
    config.allowedHosts = ['localhost'];
    return config;
};

module.exports = {
    webpack: override(
        // 여기에 다른 Webpack 설정을 추가할 수 있습니다.
    ),
    devServer: overrideDevServer(
        devServerConfig()
    )
};
