const gymnasts = readline().split(',');
const categories = readline().split(',');
const N = parseInt(readline());
const sports = ['bars', 'beam', 'floor'];
const peopleToRecord = [...Array(N).keys()].map(readline).reduce((obj, curr) => {
    const [name, a, b, c] = curr.split(',');
    const records = [+a, +b, +c];
    if (!obj[name])
        obj[name] = records;
    else
    {
        for (let i = 0; i < 3; i++)
        {
            printErr(curr[i], obj[name][i]);
            if (records[i] > obj[name][i])
                obj[name][i] = records[i];
        }
    }
    return obj;
}, {});

printErr(peopleToRecord);
for (const gymnast of gymnasts)
{
    let arr = [];
    for (const cat of categories)
        arr.push(peopleToRecord[gymnast][sports.indexOf(cat)]);
    print(arr.join(','));
}
