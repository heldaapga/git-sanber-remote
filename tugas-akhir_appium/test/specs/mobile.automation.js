describe('Open Application', () => {
    it('Input Data Name, Weight, Height and Gender', async () => {
        await $("//android.widget.EditText[@resource-id='com.fghilmany.dietmealapp:id/et_name']").click();
        const element = $("//android.widget.EditText[@resource-id='com.fghilmany.dietmealapp:id/et_name']");
        await element.setValue('Adam');

        await $("//android.widget.EditText[@resource-id='com.fghilmany.dietmealapp:id/et_weight']").click();
        const element2 = $("//android.widget.EditText[@resource-id='com.fghilmany.dietmealapp:id/et_weight']");
        await element2.setValue('59');

        await $("//android.widget.EditText[@resource-id='com.fghilmany.dietmealapp:id/et_height']").click();
        const element3 = $("//android.widget.EditText[@resource-id='com.fghilmany.dietmealapp:id/et_height']");
        await element3.setValue('169');

        await $("//android.widget.RadioButton[@resource-id='com.fghilmany.dietmealapp:id/rb_male']").click();
        await driver.hideKeyboard();
        await $("//android.widget.Button[@resource-id='com.fghilmany.dietmealapp:id/bt_next']").click();
        
        
    })
    
    it('Input Formulir Daily Activity', async () => {
        await $("//android.widget.RadioButton[@resource-id='com.fghilmany.dietmealapp:id/rb_low_to_medium']").click();
        await $("//android.widget.Button[@resource-id='com.fghilmany.dietmealapp:id/bt_finish']").click();
    })
})