const initialStates = {
  Image: {
    assetFileName: "",
    size: "",
    format: "",
    alternateText: "",
    loading: "",
  },
  Video: {
    linkType: "",
    url: "",
    showControls: false,
    autoplay: false,
    loop: false,
    volume: 100,
  },
  Lottie: {
    linkType: "",
    url: "",
    showControls: false,
    autoplay: false,
    loop: false,
    volume: 100,
  },
  iFrame: {
    html: "",
  },
  Label: {
    typeId: "",
    tabIndex: 0,
    name: "",
    value: "",
    customName: "",
    page: "",
  },
  Audio: {
    linkType: "",
    url: "",
    showControls: false,
    autoplay: false,
    loop: false,
    volume: 100,
  },
  Checkbox: {
    required: false,
    autofocus: false,
    checked: false,
    disabled: false,
    readOnly: false,
  },
};
export default initialStates;
