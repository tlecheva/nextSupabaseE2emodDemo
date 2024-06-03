
To load the image nextjs-supabase-e2emod into docker
```console
docker load -i ./front.tar
```
To run the Front on port 3000 (you may add -d to run in detached mode, i.e. in background without an trace)


```console
docker run -p 3000:80 --name front nextjs-supabase-e2emod
```

Open your browser on port 3000, you can login with supabase user axel.talvard@airbus.com with dummy password wFfmLL9bxE2sHm2
It was created using supabase dashboard admin account to add a user manaually.

```console

docker ps                   #to list the running containers

docker stop <container_id>  #to stop a container

docker rm  <container_id>   # to remove a container
```



