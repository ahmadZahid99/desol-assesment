import PropTypes from "prop-types";
//
import ImageComponent from "../../image";

// ----------------------------------------------------------------------

SingleFilePreview.propTypes = {
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default function SingleFilePreview({ file }) {
  if (!file) {
    return null;
  }

  const imgUrl = typeof file === "string" ? file : file.preview;

  return (
    <ImageComponent
      alt="file preview"
      src={imgUrl}
      sx={{
        top: 8,
        left: 8,
        zIndex: 8,
        borderRadius: 1,
        position: "absolute",
        width: "calc(100% - 16px)",
        height: "calc(100% - 16px)",
      }}
    />
  );
}
