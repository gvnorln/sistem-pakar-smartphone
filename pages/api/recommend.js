import { phones } from '../../data/phones';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const {
      osVersion,
      ukuranLayar,
      screenResolution,
      detailProsesor,
      ram,
      memoriInternal,
      resolusiKameraBelakang,
      resolusiKameraDepan,
      usb,
      kapasitasBaterai,
      '5G': is5G,
      wifi6,
    } = req.body;

    const recommendations = phones.filter((phone) => {
      return (
        phone.osVersion === osVersion &&
        phone.ukuranLayar == ukuranLayar &&
        phone.screenResolution === screenResolution &&
        phone.detailProsesor === detailProsesor &&
        phone.ram == ram &&
        phone.memoriInternal == memoriInternal &&
        phone.resolusiKameraBelakang == resolusiKameraBelakang &&
        phone.resolusiKameraDepan == resolusiKameraDepan &&
        phone.usb === usb &&
        phone.kapasitasBaterai == kapasitasBaterai &&
        (!is5G || phone['5G']) &&
        (!wifi6 || phone.wifi6)
      );
    });

    res.status(200).json(recommendations);
  } else {
    res.status(405).end();
  }
}
