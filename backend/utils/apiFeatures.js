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

  filter() {
    const queryStrCopy = { ...this.querystr };

    //console.log(queryStr);

    //removing fields from query
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach(field => delete queryStrCopy[field]);

    let querystr = JSON.stringify(queryStrCopy);

    querystr=querystr.replace(/\b(gt|gte|lt|lte)/g, match => `$${match}`);

    this.query.find(JSON.parse(querystr));
    return this;
  }

  paginate(resperpage){
    const currentPage=Number(this.query.page)||1
    const skip=resperpage*(currentPage-1)
    this.query.limit(resperpage).skip(skip)
    return this
  }
}
 
module.exports = APIFeatures;
