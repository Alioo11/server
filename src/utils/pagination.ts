const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const paginator = (page: any, limit: any) => {
  const r_page = Math.abs(page) || DEFAULT_PAGE;
  const r_limit = Math.abs(limit) || DEFAULT_LIMIT;
  return {
    skip: (r_page - 1) * r_limit,
    limit: r_page * r_limit,
  };
};

export default paginator;
