import React from "react";
import {Link} from "react-router";
import {TableRow, TableRowColumn} from "material-ui";

export default class ArticleTableRow extends React.Component {
  render() {
    const {
      id,
      title,
      user,
      category,
      push,
      published_at
    } = this.props.article;

    return (
      <TableRow>
        <TableRowColumn>
          <Link to={`/manage/articles/${id}`}>{title}</Link>
        </TableRowColumn>
        <TableRowColumn>{user.nick}</TableRowColumn>
        <TableRowColumn>{category}</TableRowColumn>
        <TableRowColumn>{push}</TableRowColumn>
        <TableRowColumn>{published_at}</TableRowColumn>
      </TableRow>
    );
  }
};
