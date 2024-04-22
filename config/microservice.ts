export default ({ env }) => ({
    serviceName: "automerge",

    broadcastServer: env("BROADCAST_SERVER", '0.0.0.0'),
});
