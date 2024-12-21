import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const API_TOKEN = process.env.STRAPI_API_TOKEN;

export interface BlogPost {
  id: number;
  attributes: {
    title: string;
    content: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    categories: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
          slug: string;
        };
      }>;
    };
    tags: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
          slug: string;
        };
      }>;
    };
    author: {
      data: {
        id: number;
        attributes: {
          name: string;
          bio: string;
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
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

const api = {
  async getBlogPosts(locale: string = 'tr'): Promise<BlogPost[]> {
    try {
      const response = await axios.get(`${API_URL}/api/blog-posts`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
        params: {
          locale,
          populate: '*',
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  },

  async getBlogPost(slug: string, locale: string = 'tr'): Promise<BlogPost | null> {
    try {
      const response = await axios.get(`${API_URL}/api/blog-posts`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
        params: {
          locale,
          'filters[slug][$eq]': slug,
          populate: '*',
        },
      });
      return response.data.data[0] || null;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  },

  async submitComment(blogPostId: number, data: {
    name: string;
    email: string;
    content: string;
  }) {
    try {
      const response = await axios.post(`${API_URL}/api/comments`, {
        data: {
          ...data,
          blogPost: blogPostId,
          status: 'pending',
        },
      }, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting comment:', error);
      throw error;
    }
  },

  async getComments(blogPostId: number) {
    try {
      const response = await axios.get(`${API_URL}/api/comments`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
        params: {
          'filters[blogPost][$eq]': blogPostId,
          'filters[status][$eq]': 'approved',
          sort: 'createdAt:desc',
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  },

  async submitContact(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    try {
      const response = await axios.post(`${API_URL}/api/contacts`, {
        data,
      }, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },
};

export default api; 