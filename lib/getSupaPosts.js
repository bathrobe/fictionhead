// get supabase files
// import supa
import { createClient } from "@supabase/supabase-js";
// init supa
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
// get posts
export async function getSupaPosts() {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .order("created_at", { ascending: false });
  return data;
}

// get post by id
export async function getSupaPostById(id) {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("id", id);
  return data;
}

// get tags by doc id
export async function getSupaTagsByDocId(id) {
  const { data, error } = await supabase
    .from("tags_docs_ref")
    .select("*")
    .eq("doc_id", id);
  // get tags from id
  const tags = data?.map((tag) => {
    return tag.tag_id;
  });
  // get tag names
  const { data: tagNames, error: tagError } = await supabase

    .from("tags")
    .select("*")
    .in("id", tags);
  return tagNames;
}

// lib/getSupaPosts.js
// ... other imports and functions ...

// get all tags
export async function getSupaTags() {
  const { data, error } = await supabase.from("tags").select("*");
  return data;
}

// get tag name by id
export async function getSupaTagNameById(id) {
  const { data, error } = await supabase
    .from("tags")
    .select("name")
    .eq("id", id);
  return data ? data[0].name : "";
}

// get posts by tag id
export async function getSupaPostsByTagId(tagId) {
  const { data, error } = await supabase
    .from("tags_docs_ref")
    .select("doc_id")
    .eq("tag_id", tagId);

  const postIds = data?.map((tag) => tag.doc_id);
  const { data: posts, error: postError } = await supabase
    .from("documents")
    .select("*")
    .in("id", postIds);

  return posts;
}
