import { Component } from '@angular/core';

@Component({
  selector: 'app-register-business',
  templateUrl: './register-business.component.html',
  styleUrls: ['./register-business.component.css']
})
export class RegisterBusinessComponent {
  business_name=''; enteredbusiness_name='';
  business_category=''; enteredbusiness_category='';
  business_phoneno=''; enteredbusiness_phoneno='';
  whatsapp_phoneno=''; enteredwhatsapp_phoneno='';
  business_email=''; enteredbusiness_email='';
  business_address=''; enteredbusiness_address='';
  products_to_sell=''; enteredproducts_to_sell='';
  if_edibleproduct_shelflife=''; enteredif_edibleproduct_shelflife='';
  delivery_service_required=''; entereddelivery_service_required='';
  learn_teach_skill=''; enteredlearn_teach_skill='';
  skill_set=''; enteredskill_set='';
  post_jobOpening=''; enteredpost_jobOpening='';
  remarks='';  enteredremarks='';

  onAddPost(){
    this.business_name = this.enteredbusiness_name;
    this.business_category = this.enteredbusiness_category;
    this.business_phoneno = this.enteredbusiness_phoneno;
    this.whatsapp_phoneno = this.enteredwhatsapp_phoneno;
    this.business_email = this.enteredbusiness_email;
    this.business_address = this.enteredbusiness_address;
    this.products_to_sell = this.enteredproducts_to_sell;
    this.if_edibleproduct_shelflife = this.enteredif_edibleproduct_shelflife;
    this.delivery_service_required = this.entereddelivery_service_required;
    this.learn_teach_skill = this.enteredlearn_teach_skill;
    this.skill_set = this.enteredskill_set;
    this.post_jobOpening = this.enteredpost_jobOpening;
    this.remarks = this.enteredremarks;
  }
}
