let string = '99599cfe971e iteration-project_node-app_1 0.00% 60MiB / 1.944GiB 3.01% 42.1kB / 13.5kB 0B / 0B 22';

string = string.replace(/\s[/]\s/g, '/');
let newArr = string.split(' ');
console.log(newArr);

/*
[
  '99599cfe971e',
  'iteration-project_node-app_1',
  '0.00%',
  '60MiB/1.944GiB',
  '3.01%',
  '42.1kB/13.5kB',
  '0B/0B',
  '22'
]
*/