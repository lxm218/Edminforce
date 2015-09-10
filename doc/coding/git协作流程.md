
Steps to contribute a new feature
=================================
### This is a merge workflow so no need to use 'git rebase'



```


$ git checkout -b myfeature develop
  Switched to a new branch "myfeature"

$ git commit -m'myfeature comment'   !!!缺少这步commit将不会出现分支合并的信息

$ git checkout develop
  Switched to branch 'develop'
  
  
  
$ git merge --no-ff myfeature
  Updating ea1b82a..05e9557
  (Summary of changes)
  
$ git branch -d myfeature
  Deleted branch myfeature (was 05e9557).
  
  
$ git commit -m'myfeature comment'

$ git push origin develop


```