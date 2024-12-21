'use client';

import { useEffect, useState } from 'react';
import { fetchAPI } from '../config';

interface BlogPost {
    id: number;
    attributes: {
        title: string;
        content: string;
        createdAt: string;
    };
}

export default function BlogPosts() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchAPI('/api/blog-posts');
                setPosts(data.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Bir hata oluştu');
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    if (loading) return <div>Yükleniyor...</div>;
    if (error) return <div>Hata: {error}</div>;

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <article key={post.id} className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">{post.attributes.title}</h2>
                    <p className="text-gray-600">{post.attributes.content}</p>
                    <time className="text-sm text-gray-500 mt-4 block">
                        {new Date(post.attributes.createdAt).toLocaleDateString('tr-TR')}
                    </time>
                </article>
            ))}
        </div>
    );
} 