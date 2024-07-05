class APIFeatures {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }

  search() {
    let keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query.find({ ...keyword });
    return this;
  }

  filter(){
    const queryStrCopy={...this.querystr}

    //removing fields from query
    const removeFields=['keyword','limit','page']
    removeFields.forEach(field=>delete queryStrCopy[field])

    this.query.find(queryStrCopy)
    return this
  }
}

module.exports=APIFeatures