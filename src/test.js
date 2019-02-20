const axios = require('axios')
const sign = require('./sign')

const params = {
  msgInfo: {
    versionNo: "1.0.0",
    timeStamp: "20190115160459",
    orgId: "0001"
  },
  trxInfo: {
    merchantId: "104767011000006",
    terminalId: "76002425",
    batchNo: "000001"
  },
  certificateSignature: {
    signature: "00000000"
  }
};
const signature = sign.sign(
  JSON.stringify(params)
);
params.certificateSignature.signature = signature;

axios.post('https://eccst.sg.ebs.bankofchina.com/sgecm/merapi/batchSettlement', params, {
  responseType: 'text'
}).then(res => {
  const data = res.data
  const signature = data.certificateSignature.signature;
  console.log(data)
  data.certificateSignature.signature = '00000000'
  console.log(sign.verity(JSON.stringify(data), signature))
})
