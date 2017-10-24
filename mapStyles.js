
// const dayStyle1 = [
//   {
//     "featureType": "administrative",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#6195a0"
//       }
//     ]
//   }, {
//     "featureType": "administrative.province",
//     "elementType": "geometry.stroke",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   }, {
//     "featureType": "landscape",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "lightness": "0"
//       }, {
//         "saturation": "0"
//       }, {
//         "color": "#f5f5f2"
//       }, {
//         "gamma": "1"
//       }
//     ]
//   }, {
//     "featureType": "landscape.man_made",
//     "elementType": "all",
//     "stylers": [
//       {
//         "lightness": "-3"
//       }, {
//         "gamma": "1.00"
//       }
//     ]
//   }, {
//     "featureType": "landscape.natural.terrain",
//     "elementType": "all",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   }, {
//     "featureType": "poi",
//     "elementType": "all",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   }, {
//     "featureType": "poi.park",
//     "elementType": "geometry.fill",
//     "stylers": [
//       {
//         "color": "#bae5ce"
//       }, {
//         "visibility": "on"
//       }
//     ]
//   }, {
//     "featureType": "road",
//     "elementType": "all",
//     "stylers": [
//       {
//         "saturation": -100
//       }, {
//         "lightness": 45
//       }, {
//         "visibility": "simplified"
//       }
//     ]
//   }, {
//     "featureType": "road.highway",
//     "elementType": "all",
//     "stylers": [
//       {
//         "visibility": "simplified"
//       }
//     ]
//   }, {
//     "featureType": "road.highway",
//     "elementType": "geometry.fill",
//     "stylers": [
//       {
//         "color": "#fac9a9"
//       }, {
//         "visibility": "simplified"
//       }
//     ]
//   }, {
//     "featureType": "road.highway",
//     "elementType": "labels.text",
//     "stylers": [
//       {
//         "color": "#4e4e4e"
//       }
//     ]
//   }, {
//     "featureType": "road.arterial",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#787878"
//       }
//     ]
//   }, {
//     "featureType": "road.arterial",
//     "elementType": "labels.icon",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   }, {
//     "featureType": "transit",
//     "elementType": "all",
//     "stylers": [
//       {
//         "visibility": "simplified"
//       }
//     ]
//   }, {
//     "featureType": "transit.station.airport",
//     "elementType": "labels.icon",
//     "stylers": [
//       {
//         "hue": "#0a00ff"
//       }, {
//         "saturation": "-77"
//       }, {
//         "gamma": "0.57"
//       }, {
//         "lightness": "0"
//       }
//     ]
//   }, {
//     "featureType": "transit.station.rail",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#43321e"
//       }
//     ]
//   }, {
//     "featureType": "transit.station.rail",
//     "elementType": "labels.icon",
//     "stylers": [
//       {
//         "hue": "#ff6c00"
//       }, {
//         "lightness": "4"
//       }, {
//         "gamma": "0.75"
//       }, {
//         "saturation": "-68"
//       }
//     ]
//   }, {
//     "featureType": "water",
//     "elementType": "all",
//     "stylers": [
//       {
//         "color": "#eaf6f8"
//       }, {
//         "visibility": "on"
//       }
//     ]
//   }, {
//     "featureType": "water",
//     "elementType": "geometry.fill",
//     "stylers": [
//       {
//         "color": "#c7eced"
//       }
//     ]
//   }, {
//     "featureType": "water",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "lightness": "-49"
//       }, {
//         "saturation": "-53"
//       }, {
//         "gamma": "0.79"
//       }
//     ]
//   }
// ]
const dayStyle = [
    {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#7c93a3"
        }, {
          "lightness": "-10"
        }
      ]
    }, {
      "featureType": "administrative.country",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    }, {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#a0a4a5"
        }
      ]
    }, {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#62838e"
        }
      ]
    }, {
      "featureType": "landscape",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#dde3e3"
        }
      ]
    }, {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#3f4a51"
        }, {
          "weight": "0.30"
        }
      ]
    }, {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "simplified"
        }
      ]
    }, {
      "featureType": "poi.attraction",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    }, {
      "featureType": "poi.business",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }, {
      "featureType": "poi.government",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }, {
      "featureType": "poi.park",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    }, {
      "featureType": "poi.place_of_worship",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }, {
      "featureType": "poi.school",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }, {
      "featureType": "poi.sports_complex",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }, {
      "featureType": "road",
      "elementType": "all",
      "stylers": [
        {
          "saturation": "-100"
        }, {
          "visibility": "on"
        }
      ]
    }, {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#bbcacf"
        }
      ]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "lightness": "0"
        }, {
          "color": "#bbcacf"
        }, {
          "weight": "0.50"
        }
      ]
    }, {
      "featureType": "road.highway",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    }, {
      "featureType": "road.highway",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    }, {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    }, {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#a9b4b8"
        }
      ]
    }, {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [
        {
          "invert_lightness": true
        }, {
          "saturation": "-7"
        }, {
          "lightness": "3"
        }, {
          "gamma": "1.80"
        }, {
          "weight": "0.01"
        }
      ]
    }, {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }, {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#a3c7df"
        }
      ]
    }
  ]
  const nightStyle = [
    {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "saturation": 36
        }, {
          "color": "#000000"
        }, {
          "lightness": 40
        }
      ]
    }, {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "visibility": "on"
        }, {
          "color": "#000000"
        }, {
          "lightness": 16
        }
      ]
    }, {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#000000"
        }, {
          "lightness": 20
        }
      ]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#000000"
        }, {
          "lightness": 17
        }, {
          "weight": 1.2
        }
      ]
    }, {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }, {
          "lightness": 20
        }
      ]
    }, {
      "featureType": "landscape.man_made",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "visibility": "simplified"
        }
      ]
    }, {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }, {
      "featureType": "landscape.man_made",
      "elementType": "labels.text",
      "stylers": [
        {
          "color": "#ff0000"
        }, {
          "saturation": "50"
        }, {
          "gamma": "8.34"
        }
      ]
    }, {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }, {
          "lightness": 21
        }
      ]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#000000"
        }, {
          "lightness": 17
        }
      ]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#000000"
        }, {
          "lightness": 29
        }, {
          "weight": 0.2
        }
      ]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }, {
          "lightness": 18
        }
      ]
    }, {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }, {
          "lightness": 16
        }
      ]
    }, {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }, {
          "lightness": 19
        }
      ]
    }, {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#0f252e"
        }, {
          "lightness": 17
        }
      ]
    }
  ]
  export { dayStyle  ,nightStyle};