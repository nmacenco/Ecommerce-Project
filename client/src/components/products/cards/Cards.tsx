import React from "react";
import Card from "./card/Card";

const data = [
  {
    id: 1,
    subcategory_id: [2, 5, 3],
    name: "Mouse",
    brand: "Glorius",
    image:
      "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_21233_Mouse_Glorious_Model_D_Minus_-_Matte_Black_ad043ce3-grn.jpg",
    price: 199.53,
    description: "Excision of Left Thorax Tendon, Percutaneous Approach",
    weight: 44,
    stock: 30,
  },
  {
    id: 2,
    subcategory_id: [{}],
    name: "Gabinete",
    brand: "Asus",
    image:
      "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_21594_Gabinete_ASUS_ROG_STRIX_Helios_Aluminum_Black_RGB_81c9ec14-med.jpg",
    price: 155.47,
    description:
      "Supplement Left Femoral Vein with Autologous Tissue Substitute, Open Approach",
    weight: 83,
    stock: 24,
  },
  {
    id: 3,
    subcategory_id: [{}],
    name: "Fuente",
    brand: "Asus",
    image:
      "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_22432_Fuente_ASUS_ROG_STRIX_750G_80_Plus_Gold_750W_Full_Modular_38c61d29-med.jpg",
    price: 262.3,
    description: "Removal of Pressure Dressing on Left Hand",
    weight: 75,
    stock: 26,
  },
  {
    id: 4,
    subcategory_id: [{}],
    name: "Teclado Mecanico",
    brand: "Asus",
    image:
      "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_23247_Teclado_Mecanico_ASUS_TUF_Gaming_K3_US_Red_0a1144ab-med.jpg",
    price: 48.33,
    description: "Immobilization of Back using Brace",
    weight: 40,
    stock: 27,
  },
  {
    id: 5,
    subcategory_id: [{}],
    name: "Memoria",
    brand: "Geil",
    image:
      "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_25314_Memoria_GeiL_DDR4_16GB_3000MHz_Orion_RGB_Black_c9ca6a5c-med.jpg",
    price: 471.85,
    description:
      "Change Other Device in Lower Bursa and Ligament, External Approach",
    weight: 40,
    stock: 16,
  },
  {
    id: 6,
    subcategory_id: [{}],
    name: "Notebook Gamer",
    brand: "AORUS",
    image:
      "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_30650_Notebook_Gamer_AORUS_KD_15.6__I7_11800H_16GB__2x8GB__512GB_SSD_NVMe_RTX_3060_240Hz_W11_02c902ce-med.jpg",
    price: 460.8,
    description:
      "Reposition Left Carpal Joint, Percutaneous Endoscopic Approach",
    weight: 13,
    stock: 16,
  },
  {
    id: 7,
    subcategory_id: [{}],
    name: "Silla Gamer",
    brand: "Cooler",
    image:
      "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_30707_Silla_Gamer_Cooler_Master_Caliber_R1S_PINK___WHITE_Special_Edition_79defc98-med.jpg",
    price: 203.25,
    description:
      "Bypass Innominate Artery to Right Extracranial Artery with Autologous Arterial Tissue, Open Approach",
    weight: 50,
    stock: 28,
  },
  {
    id: 8,
    subcategory_id: [{}],
    name: "Monitor",
    brand: "Benq MOBIUS",
    image:
      "https://thumb.pccomponentes.com/w-530-530/articles/1003/10038436/188-benq-mobiuz-ex3210u-32-led-ips-ultrahd-4k-144hz-freesync-premium-pro.jpg",
    price: 154.77,
    description:
      "Bypass Left Pulmonary Artery from Subclavian with Autologous Venous Tissue, Open Approach",
    weight: 64,
    stock: 3,
  },
  {
    id: 9,
    subcategory_id: [{}],
    name: "Disco Externo",
    brand: "Seagate",
    image:
      "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_25936_Disco_Externo_SSD_Seagate_500GB_XBOX_Negro_USB_3.0_e1a592a7-med.jpg",
    price: 110.18,
    description:
      "Fluoroscopy of Other Lower Arteries using Low Osmolar Contrast",
    weight: 90,
    stock: 18,
  },
  {
    id: 10,
    subcategory_id: [{}],
    name: "Disco Solido",
    brand: "SSD",
    image:
      "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_28763_Disco_Solido_SSD_Externo_Team_PD1000_512GB_1000MB_s_331e9a70-med.jpg",
    price: 329.59,
    description:
      "Bypass Thoracic Aorta, Ascending/Arch to Right Pulmonary Artery with Zooplastic Tissue, Open Approach",
    weight: 36,
    stock: 22,
  },
  {
    id: 11,
    subcategory_id: [{}],
    name: "WebCam",
    brand: "Logitech",
    image:
      "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_13417_WebCam_Logitech_C925e_Full_HD_con_tapa_53ed28a3-med.jpg",
    price: 114.13,
    description:
      "Revision of Infusion Device in Pancreatic Duct, Via Natural or Artificial Opening",
    weight: 68,
    stock: 2,
  },
  {
    id: 12,
    subcategory_id: [{}],
    name: "WebCam",
    brand: "Redragon",
    image:
      "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_20302_Webcam_Redragon_GW600_FOBOS_720p_5546388f-med.jpg",
    price: 289.87,
    description: "Release Left Internal Jugular Vein, Percutaneous Approach",
    weight: 44,
    stock: 23,
  },
  {
    id: 13,
    subcategory_id: [{}],
    name: "Volante",
    brand: "Logitech",
    image:
      "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_22257_Volante_Logitech_G923_Trueforce_220V_PS4_PC_d7f01169-med.jpg",
    price: 256.83,
    description:
      "Insertion of Infusion Device into Trunk Subcutaneous Tissue and Fascia, Open Approach",
    weight: 86,
    stock: 16,
  },
  {
    id: 14,
    subcategory_id: [{}],
    name: "Placa WiFi",
    brand: "TP-Link",
    image:
      "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_11907_Placa_WiFi_USB_TP-Link_TL-WN822N_Hi_Power_300Mbps_8e4ba45b-med.jpg",
    price: 429.99,
    description:
      "Supplement Left Internal Mammary Artery with Autologous Tissue Substitute, Percutaneous Endoscopic Approach",
    weight: 73,
    stock: 15,
  },
  {
    id: 15,
    subcategory_id: [{}],
    name: "Cooler",
    brand: "Fan",
    image:
      "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_30061_Cooler_FAN_ID-Cooling_TF-12025-ARGB_c00dfaca-med.jpg",
    price: 72.22,
    description:
      "Supplement Superior Mesenteric Artery with Autologous Tissue Substitute, Percutaneous Approach",
    weight: 80,
    stock: 8,
  },
];

const Cards = () => {
  return (
    <div className="d-grid gap-2 col-7 mx-auto mt-3">
      {data.map((e) => {
        return <Card key={e.id} name={e.name} image={e.image} price={e.price}/>;
      })}
    </div>
  );
};

export default Cards;
