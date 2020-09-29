module.exports = async function (context, req) {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: { domain_id: domain, client_id: clientId },
  }
}
