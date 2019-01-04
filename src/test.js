const axios = require('axios')
const sign = require('./sign')

const params = {
  msgInfo: {
    versionNo: "1.0.0",
    timeStamp: "20190102104538",
    orgId: "0001"
  },
  trxInfo: {
    merchantId: "123456789012345",
    terminalId: "12345678",
    tranAmt: 100,
    ccyCode: "702",
    merTraceNo: "201901021135390001000001",
    payLoad: "result.text"
  },
  certificateSignature: {
    signature: "00000000"
  }
};
const signature = sign.sign(
  JSON.stringify(params)
);
params.certificateSignature.signature = signature;

axios.post('http://localhost:9999/purchase', params, {
  responseType: 'text'
}).then(res => {
  const data = res.data
  const signature = data.certificateSignature.signature;
  data.certificateSignature.signature = '00000000'
  console.log(data)
  console.log(sign.verity(JSON.stringify(data), signature))
})
