import { GoogleSpreadsheet } from "google-spreadsheet";
import moment from "moment";

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID);

const genCoupom = () => {
  const code = parseInt(moment().format("YYMMDDHHmmssSSS"))
    .toString(16)
    .toUpperCase();
  return code.substr(0, 4) + "-" + code.substr(4, 4) + "-" + code.substr(8, 4);
};

export default async (req, res) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENTE_EMAIL,
      private_key: process.env.SHEET_PRIVATE_KEY,
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[1];
    const data = JSON.parse(req.body);

    const sheetConfig = doc.sheetsByIndex[2];
    await sheetConfig.loadCells("A3:B3");

    const showPromotion = sheetConfig.getCell(2, 0);
    const textCell = sheetConfig.getCell(2, 1);

    let Coupom = "";
    let Promo = "";
    if (showPromotion.value === "VERDADEIRO") {
      Coupom = genCoupom();
      Promo = textCell.value;
    }

    await sheet.addRow({
      Name: data.Nome,
      Email: data.Email,
      Whatsapp: data.Whatsapp,
      Grade: 5,
      Date: moment().format("DD/MM/YYYY HH:mm:ss"),
      Coupom,
      Promo,
    });
    res.end(
      JSON.stringify({
        showCoupom: Coupom !== "",
        Coupom,
        Promo,
      })
    );
  } catch (err) {
    console.log(err);
    res.end("error");
  }
};
