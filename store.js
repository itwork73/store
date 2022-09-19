const Store = {
    params:{
        sid: 'mystore_',
    },
    isObject:function(obj){

        return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;

    },
    getAll:function(){
        
        if(!window.localStorage) { return {}; }
        
        let result = {};

        localStorage.forEach((value,key)=>{

            if(!localStorage.hasOwnProperty(key) || key.indexOf(this.params.sid) !== 0){
                return false;
            }

            let thisKey = key.replace(this.params.sid, "");
            let thisValue = {};

            try {
                thisValue = JSON.parse(value);
            } catch(e) {
                thisValue = {};
            }

            result[thisKey] = thisValue;

        });

        return result;

    },
    getValue:function(key){

        if(!window.localStorage || !key) { return {}; }

        key = this.params.sid + key;

        let item = window.localStorage.getItem(key);

        if (item === null) { return {}; }

        try {
            return JSON.parse(item);
        } catch(e) {
            return {};
        }

    },
    setValue:function(key, value){

        if(!window.localStorage || !key || !this.isObject(value)) { return false; }

        key = this.params.sid + key;

        let data = JSON.stringify(value);

        window.localStorage.setItem(key, data);

        return true;

    },
    mergeValue:function(key, value){

        if(!window.localStorage || !key || !this.isObject(value)) { return false; }

        let storeValue = this.getValue(key);
        let mergedValue = Object.assign({}, storeValue, value);

        return this.setValue(key, mergedValue);

    },

};
