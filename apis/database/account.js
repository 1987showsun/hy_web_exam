const profile = {
    "id"   : "000001",
    "name" : {
        "first_name": "li",
        "last_name": "sun"
    },
    "email": "19870121sunli@gmail.com",
    "dosc": "",
    "cover": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/mbkf-1627302232.jpg?crop=0.495xw:0.990xh;0.505xw,0&resize=640:*"
}

const collection = [
    {
        "id": "00004",
        "title": "Audi_A4_S4",
        "cover": "http://localhost:3000/images/Audi_A4_S4.png",
        "play_url": "http://localhost:3000/media/Audi_A4_S4.m3u8"
      },
      {
        "id": "00005",
        "title": "Bugatti_Chiron",
        "cover": "http://localhost:3000/images/Bugatti_Chiron.png",
        "play_url": "http://localhost:3000/media/Bugatti_Chiron.m3u8"
      },
      {
        "id": "00006",
        "title": "Range_Rover_Sport_L322",
        "cover": "http://localhost:3000/images/Range_Rover_Sport_L322.png",
        "play_url": "http://localhost:3000/media/Range_Rover_Sport_L322.m3u8"
      }
]

module.exports = {
    profile,
    collection
}