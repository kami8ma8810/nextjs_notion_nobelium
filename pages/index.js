import BLOG from '@/blog.config';
import Container from '@/components/Container';
import BlogPost from '@/components/BlogPost';
import Pagination from '@/components/Pagination';
import { getAllPosts, getAllTagsFromPosts } from '@/lib/notion';
import SearchLayout from '@/layouts/search';

export async function getStaticProps() {
  const posts = await getAllPosts({ includePages: false });
  const tags = getAllTagsFromPosts(posts);
  const postsToShow = posts.slice(0, BLOG.postsPerPage);
  const totalPosts = posts.length;
  const showNext = totalPosts > BLOG.postsPerPage;
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      showNext,
      tags,
      posts,
    },
    revalidate: 1,
  };
}

const blog = ({ postsToShow, page, showNext, tags, posts }) => {
  return (
    <Container title={BLOG.title} description={BLOG.description}>
      <SearchLayout tags={tags} posts={posts} />
      {postsToShow.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
      {showNext && <Pagination page={page} showNext={showNext} />}
    </Container>
  );
};

export default blog;
