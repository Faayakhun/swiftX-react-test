import React from "react";
import TreeItem from "@material-ui/lab/TreeItem";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useTreeItemStyles = makeStyles(theme => ({
  root: {},
  content: {},
  group: {},
  expanded: {},
  label: {
    fontWeight: "inherit",
    color: "inherit",
    marginLeft:"8px"
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "8px",
    paddingBottom: "8px"
  },
  //for some reason these does not apply to the icon we specified
  labelIcon: {
    marginRight: theme.spacing(1),
    verticalAlign: "middle",
    color: "#fcba03"
  },
  labelText: {
    marginTop: "2px",
    marginLeft:"8px",
    fontWeight: "inherit",
    flexGrow: 1,
    overflowWrap: "break-word",
    overflow: "hidden"
  }
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    ...other
  } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <div className={classes.labelText}>{labelText}</div>
          <span>{labelInfo}</span>
        </div>
      }
      title={labelText}
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
        whiteSpace:"nowrap"
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        group: classes.group,
        label: classes.label
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired
};

export default StyledTreeItem;
