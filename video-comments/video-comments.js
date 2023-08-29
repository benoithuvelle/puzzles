const PRIORITY = ["Pinned", "Followed", "none"];
const n = readline();
const comments = [];
let parent = undefined;
for (let i = 0; i < n; i++)
{
  const content = readline();
  const [user, time, like, priority] = content.split("|");
  const [hour, min] = time.split(":").map((x) => +x);
  const timestamp = hour * 60 + min;
  const c = {
    user,
    time: timestamp,
    like,
    priority: PRIORITY.indexOf(priority),
    content: content,
    children: [],
    index: i,
  };
  if (content === content.trim())
  {
    parent = c;
    comments.push(c);
  }
  else
      parent.children.push(c);
}

sortGroup(comments);

function sortGroup(group)
{
  printErr(group);
  if (!group)
      return;
  const allTypes = group.reduce(
    (arr, c) => {
      arr[c.priority].push(c);
      return arr;
    },
    new Array(3).fill(0).map((_) => new Array())
  );
  for (const type of allTypes)
  {
    const likeMap = type.reduce((map, c) => {
      const like = map.get(c.like);
      if (!like)
          map.set(c.like, [c]);
      else
          like.push(c);
      return map;
    }, new Map());

    const sortedByLike = Array.from(likeMap).sort((a, b) => b[0] - a[0]);

    for (const [, comments] of sortedByLike)
    {
      const timeMap = comments.reduce((map, c) => {
        const t = map.get(c.time);
        if (!t)
            map.set(c.time, [c]);
        else
            t.push(c);
        return map;
      }, new Map());

      const sortedByTime = Array.from(timeMap).sort((a, b) => b[0] - a[0]);
      for (const [, comments] of sortedByTime)
      {
        const byIndex = comments.sort((a, b) => a.index - b.index);
        for (const comment of byIndex)
        {
          console.log(comment.content);
          sortGroup(comment.children);
        }
      }
    }
  }
}
