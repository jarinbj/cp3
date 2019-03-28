let app = new Vue({
    el: '#app',
    data: {
    name: '',
     image: '',
      loading: true,
      mainScreen: true,
      fighters: [],
      moves: [],
      myStyle:{
        backgroundColor:"#16a085" 
        },
    },
    created() {
      this.smash();
    },
    methods: {
        async smash() {
            try {
                this.loading = true;
                this.mainScreen = true;
                this.fighters = [];
                const response = await axios.get('https://test-khapi.frannsoft.com/api/characters');
                let i = 0;
                let ar = [];
                let j = 0;
                for(let i = 0; i < response.data.length; i++)
                {   
                  if (i % 2 === 0 && i != 0)
                  {
                    j++;
                    this.fighters.push(ar);
                    ar = [];
                  }
                    ar.push({
                      name: response.data[i].Name,
                      image: response.data[i].MainImageUrl,
                    });

                    if (i === response.data.length - 1)
                    {
                      this.fighters.push(ar);
                      ar = [];
                    }
                }
                this.loading = false;
            } catch (error) {
                this.number = this.max;
            }
        },
          async getCharData(name) {
            this.loading = true;
            this.mainScreen = false;
            this.moves = [];
            const response = await axios.get('https://test-khapi.frannsoft.com/api/characters/name/' + name);

            this.image = response.data.MainImageUrl;
            this.name = response.data.Name;
            this.myStyle.backgroundColor = response.data.ColorTheme;

            const response2 = await axios.get("https://test-khapi.frannsoft.com/api/characters/name/" + name + "/moves");
            console.log(response);

            for(let i = 0; i < response2.data.length; i++)
            {
              if (response2.data[i].MoveType == "special")
              {
                var n = response2.data[i].Name.replace(/ *\([^)]*\) */g, "");

                if (!this.moves.includes(n))
                {
                  this.moves.push(n);
                }
              }
            }

            this.loading = false;
          },
    }
});
