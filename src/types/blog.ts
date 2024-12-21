export interface BlogPost {
  id: number;
  attributes: {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    publishedAt: string;
    author: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
    category: {
      data: {
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
    cover: {
      data: {
        attributes: {
          url: string;
          alternativeText: string;
        };
      };
    };
  };
} 