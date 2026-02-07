'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/common/Header';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const REVIEWS = [
  {
    name: 'Pooja Rawat',
    rating: 5,
    text: 'Excellent root canal treatment. Painless and very smooth process. Highly recommended!',
    date: '2 days ago',
    color: 'bg-rose-100 text-rose-600',
  },
  {
    name: 'Anjali Devi',
    rating: 5,
    text: 'Staff are very co-operative and have good behavior. Felt very comfortable during my treatment.',
    date: '3 weeks ago',
    color: 'bg-sky-100 text-sky-600',
  },
  {
    name: 'Manish Pandey',
    rating: 5,
    text: 'Highly professional staff and very hygienic clinic. The sterilization process they follow is top-notch.',
    date: '1 month ago',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    name: 'Gaurav Rawat',
    rating: 5,
    text: 'Painless treatment and very hygienic environment. All new concepts and techniques used by Dr. Singh.',
    date: '2 months ago',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    name: 'Rohit Negi',
    rating: 5,
    text: 'The team is polite in behavior and best at work!! Highly recommended for any dental issues.',
    date: '1 month ago',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    name: 'Savitri Devi',
    rating: 5,
    text: "The best dental treatment I have seen so far. I've been to many clinics in the past but never felt this comfortable and satisfied anywhere else.",
    date: '4 months ago',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    name: 'Rahul Bisht',
    rating: 5,
    text: 'Best dental clinic in all of Uttarakhand. Very professional and expert care.',
    date: '6 months ago',
    color: 'bg-rose-100 text-rose-600',
  },
  {
    name: 'Deepak Singh',
    rating: 5,
    text: 'Very satisfied with my root canal. It was quick and absolutely painless. Professional and polite conduct of the entire team.',
    date: '2 weeks ago',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    name: 'Maya Pant',
    rating: 5,
    text: 'Singh Dental is the best for complex surgeries. Their techniques are modern and the clinic is spotless.',
    date: '1 year ago',
    color: 'bg-teal-100 text-teal-600',
  },
  {
    name: 'Vicky',
    rating: 5,
    text: 'Singh dental clinic and implant center is best dental Consultant in Uttarakhand region.',
    date: '8 months ago',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    name: 'Mohit',
    rating: 5,
    text: 'Singh Dental Clinic is one of the best clinic and staff are co-operative and have good behavior.',
    date: '5 months ago',
    color: 'bg-fuchsia-100 text-fuchsia-600',
  },
  {
    name: 'Sandeep',
    rating: 5,
    text: 'Good and satisfied treatment given by doctor Pradeep Singh. Polite in behavior and best at work!!',
    date: '9 months ago',
    color: 'bg-cyan-100 text-cyan-600',
  },
  {
    name: 'Ramesh Chandra',
    rating: 5,
    text: 'Dr. Singh made my root canal experience completely painless. I was terrified initially, but his gentle approach and modern equipment made all the difference.',
    date: 'Dec 2024',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'Lakshmi Iyer',
    rating: 5,
    text: 'After losing my front tooth in an accident, I was devastated. Dr. Singh and his team gave me my confidence back with a perfect dental implant.',
    date: 'Nov 2024',
    color: 'bg-green-100 text-green-600',
  },
  {
    name: 'Manish Pandey',
    rating: 5,
    text: 'Highly professional staff and very hygienic clinic. The sterilization process they follow is top-notch.',
    date: '1 week ago',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    name: 'Kavita Bisht',
    rating: 5,
    text: 'I had my braces treatment here and the results are amazing. Dr. Singh is very patient and explains everything clearly.',
    date: '3 months ago',
    color: 'bg-sky-100 text-sky-600',
  },
  {
    name: 'Sanjay Joshi',
    rating: 5,
    text: 'Best place for dental implants in Ramnagar. The procedure was smooth and the recovery was quick.',
    date: '5 months ago',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    name: 'Meena Kandpal',
    rating: 5,
    text: 'Very friendly doctors and staff. They make you feel relaxed even during complex procedures.',
    date: '2 weeks ago',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    name: 'Harish Rawat',
    rating: 5,
    text: 'Economical treatment with high quality standards. I am very happy with my new dentures.',
    date: '6 months ago',
    color: 'bg-rose-100 text-rose-600',
  },
  {
    name: 'Priyanka Sharma',
    rating: 5,
    text: 'The teeth whitening treatment worked wonders for me. Highly recommend Singh Dental Clinic for cosmetic dentistry.',
    date: '1 month ago',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    name: 'Rakesh Verma',
    rating: 5,
    text: 'Quick and effective emergency care. I had a severe toothache at night and they managed to see me first thing in the morning.',
    date: '4 months ago',
    color: 'bg-teal-100 text-teal-600',
  },
  {
    name: 'Sunita Devi',
    rating: 5,
    text: 'Excellent child care. My son used to be afraid of dentists, but now he is comfortable thanks to Dr. Singh.',
    date: '7 months ago',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    name: 'Amit Kumar',
    rating: 5,
    text: 'I got my wisdom tooth extracted here. It was a surgical procedure but I felt no pain at all.',
    date: '2 months ago',
    color: 'bg-fuchsia-100 text-fuchsia-600',
  },
  {
    name: 'Deepa Mehra',
    rating: 5,
    text: 'Modern equipment and digital X-rays. It is great to have such advanced facilities in Ramnagar.',
    date: '9 months ago',
    color: 'bg-cyan-100 text-cyan-600',
  },
  {
    name: 'Vijay Singh',
    rating: 5,
    text: "Dr. Singh is very knowledgeable and honest. He doesn't suggest unnecessary treatments.",
    date: '1 year ago',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'Lata Rani',
    rating: 5,
    text: 'Very satisfied with my bridge work. It fits perfectly and looks natural.',
    date: '3 weeks ago',
    color: 'bg-green-100 text-green-600',
  },
  {
    name: 'Bhupendra Koranga',
    rating: 5,
    text: 'Best dental hospital in the area. The building is clean and there is plenty of parking space.',
    date: '8 months ago',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    name: 'Sarita Negi',
    rating: 5,
    text: 'The gum treatment I received here was very effective. My bleeding gums problem is completely gone.',
    date: '5 months ago',
    color: 'bg-sky-100 text-sky-600',
  },
  {
    name: 'Rajesh Garjola',
    rating: 5,
    text: 'Professional dental service with a personal touch. Dr. Singh is the best dentist in Ramnagar.',
    date: '2 months ago',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    name: 'Kamla Devi',
    rating: 5,
    text: 'Staff behavior is very polite. They explain the cost and procedure beforehand.',
    date: '6 months ago',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    name: 'Suraj Pal',
    rating: 5,
    text: 'I had a great experience with invisalign treatment here. It was worth every penny.',
    date: '1 month ago',
    color: 'bg-rose-100 text-rose-600',
  },
  {
    name: 'Neema Arya',
    rating: 5,
    text: 'Satisfied with the scaling and polishing. My teeth feel much cleaner now.',
    date: '2 weeks ago',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    name: 'Gopal Dutt',
    rating: 5,
    text: 'Singh dental clinic is very well maintained. All safety protocols are followed strictly.',
    date: '4 months ago',
    color: 'bg-teal-100 text-teal-600',
  },
  {
    name: 'Pushpa Bisht',
    rating: 5,
    text: 'Dr. Singh is very gentle with elderly patients. My father had a very good experience.',
    date: '7 months ago',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    name: 'Nitin Pandey',
    rating: 5,
    text: 'Best technology and expert doctors. I highly recommend for any complicated dental surgery.',
    date: '3 months ago',
    color: 'bg-fuchsia-100 text-fuchsia-600',
  },
  {
    name: 'Hema Pant',
    rating: 5,
    text: 'Clean clinic, good staff and expert doctors. What more can one ask for?',
    date: '1 month ago',
    color: 'bg-cyan-100 text-cyan-600',
  },
  {
    name: 'Kishore Kumar',
    rating: 5,
    text: 'Professionalism at its best. Appointment was on time and treatment was efficient.',
    date: '5 months ago',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'Radha Devi',
    rating: 5,
    text: "Dr. Singh is very kind. He understands the patient's pain and provides immediate relief.",
    date: '9 months ago',
    color: 'bg-green-100 text-green-600',
  },
  {
    name: 'Manoj Bhatt',
    rating: 5,
    text: 'Singh Dental Clinic is the gold standard for dental care in Uttarakhand.',
    date: '2 months ago',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    name: 'Simranjeet Singh',
    rating: 5,
    text: "My root canal was done so quickly and I didn't feel a thing. Amazing!",
    date: '4 months ago',
    color: 'bg-sky-100 text-sky-600',
  },
  {
    name: 'Geeta Ram',
    rating: 5,
    text: 'Wonderful experience with dental veneers. My smile has completely changed.',
    date: '6 months ago',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    name: 'Anuj Saini',
    rating: 5,
    text: 'Top notch dental services at affordable rates. Thank you Dr. Singh.',
    date: '1 month ago',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    name: 'Preeti Kumari',
    rating: 5,
    text: 'Hygienic and professional. The wait time is very low if you have an appointment.',
    date: '2 weeks ago',
    color: 'bg-rose-100 text-rose-600',
  },
  {
    name: 'Rajinder Pal',
    rating: 5,
    text: 'Best dental consultant I have ever met. Very detailed explanation of my oral health.',
    date: '5 months ago',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    name: 'Meena Sharma',
    rating: 5,
    text: 'Highly recommended for kids. The staff is very friendly and patient with them.',
    date: '8 months ago',
    color: 'bg-teal-100 text-teal-600',
  },
  {
    name: 'Kailash Joshi',
    rating: 5,
    text: 'Excellent sterilization. I felt very safe during my visit.',
    date: '3 months ago',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    name: 'Indu Bisht',
    rating: 5,
    text: "Dr. Singh's hand is very precise. I had multiple fillings and they feel very natural.",
    date: '2 months ago',
    color: 'bg-fuchsia-100 text-fuchsia-600',
  },
  {
    name: 'Mohan Lal',
    rating: 5,
    text: 'Professional staff and polite in behavior.. best dental Consultant in Uttarakhand region.',
    date: '6 months ago',
    color: 'bg-cyan-100 text-cyan-600',
  },
  {
    name: 'Sushila Devi',
    rating: 5,
    text: 'Very satisfied with the treatment. The clinic is very clean and staff is very helpful.',
    date: '1 year ago',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'Yogesh Pant',
    rating: 5,
    text: 'Best dentist in Ramnagar. I am visiting him for last 5 years.',
    date: '4 months ago',
    color: 'bg-green-100 text-green-600',
  },
  {
    name: 'Dinesh Rawat',
    rating: 5,
    text: 'Modern facilities and experienced doctors. Best combination for dental care.',
    date: '1 month ago',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    name: 'Usha Mehra',
    rating: 5,
    text: 'Felt very comfortable during the entire procedure. Thank you team Singh Dental.',
    date: '5 months ago',
    color: 'bg-sky-100 text-sky-600',
  },
  {
    name: 'Ravi Bisht',
    rating: 5,
    text: 'I got my tooth jewel here. It looks really cool and the process was very simple.',
    date: '2 months ago',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    name: 'Babita Pandey',
    rating: 5,
    text: 'The best thing about this clinic is the staff and their cooperative nature.',
    date: '6 months ago',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    name: 'Suresh Chandra',
    rating: 5,
    text: 'Painless RCT and professional approach. I will definitely recommend to others.',
    date: '3 months ago',
    color: 'bg-rose-100 text-rose-600',
  },
  {
    name: 'Anjali Sharma',
    rating: 5,
    text: 'Beautiful interior and very clean. Makes you feel calm before the treatment.',
    date: '1 month ago',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    name: 'Ganesh Bhatt',
    rating: 5,
    text: "Very efficient and fast service. They don't make you wait unnecessarily.",
    date: '5 months ago',
    color: 'bg-teal-100 text-teal-600',
  },
  {
    name: 'Maya Rawat',
    rating: 5,
    text: 'Best dental clinic for all family members. They provide comprehensive care for everyone.',
    date: '8 months ago',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    name: 'Prakash Pant',
    rating: 5,
    text: 'Advanced equipment and expert hand. Dr. Singh is a true professional.',
    date: '2 weeks ago',
    color: 'bg-fuchsia-100 text-fuchsia-600',
  },
  {
    name: 'Shanti Devi',
    rating: 5,
    text: 'The results of my dentures were great. I can eat normally now.',
    date: '7 months ago',
    color: 'bg-cyan-100 text-cyan-600',
  },
  {
    name: 'Rajesh Mehra',
    rating: 5,
    text: 'Clean, hygienic and professional. Best in district Nainital.',
    date: '3 months ago',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'Nirmala Bisht',
    rating: 5,
    text: 'Excellent treatment for my sensitive teeth. The suggestions were very helpful.',
    date: '1 month ago',
    color: 'bg-green-100 text-green-600',
  },
  {
    name: 'Vikas Negi',
    rating: 5,
    text: 'Professionalism at every step. From appointment to the final procedure.',
    date: '4 months ago',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    name: 'Sonia Rawat',
    rating: 5,
    text: 'I am so happy with my smile makeover. Dr. Singh did an amazing job.',
    date: '6 months ago',
    color: 'bg-sky-100 text-sky-600',
  },
  {
    name: 'Manish Arya',
    rating: 5,
    text: 'Very polite and skilled staff. They really care about the patients.',
    date: '2 months ago',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    name: 'Heera Lal',
    rating: 5,
    text: 'Value for money. The charges are very genuine for the quality of care provided.',
    date: '3 weeks ago',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    name: 'Kusum Pandey',
    rating: 5,
    text: 'Best dental experience I ever had. No pain, no fear.',
    date: '6 months ago',
    color: 'bg-rose-100 text-rose-600',
  },
  {
    name: 'Deepak Koranga',
    rating: 5,
    text: 'Highly technological clinic. Everything is digital and advanced.',
    date: '5 months ago',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    name: 'Anand Singh',
    rating: 5,
    text: 'Dr. Singh is very experienced. His diagnosis is always correct.',
    date: '9 months ago',
    color: 'bg-teal-100 text-teal-600',
  },
  {
    name: 'Radhika Mehra',
    rating: 5,
    text: 'Satisfied with the gum treatment. The clinic environment is very positive.',
    date: '2 months ago',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    name: 'Vinod Saini',
    rating: 5,
    text: 'Best dental consultant in Ramnagar. Always provides the best advice.',
    date: '1 month ago',
    color: 'bg-fuchsia-100 text-fuchsia-600',
  },
  {
    name: 'Parvati Devi',
    rating: 5,
    text: "My daughter's root canal was painless. She didn't even cry.",
    date: '4 months ago',
    color: 'bg-cyan-100 text-cyan-600',
  },
  {
    name: 'Jagdish Bhatt',
    rating: 5,
    text: 'Excellent service and very polite staff. Best place for dental care.',
    date: '6 months ago',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'Sapna Sharma',
    rating: 5,
    text: 'Professional, hygienic and clean. I am very satisfied with my crown.',
    date: '2 months ago',
    color: 'bg-green-100 text-green-600',
  },
  {
    name: 'Kailash Koranga',
    rating: 5,
    text: 'Hygienic and disciplined clinic. All staff members are strictly professional.',
    date: '5 months ago',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    name: 'Saroj Bisht',
    rating: 5,
    text: 'The whitening treatment exceeded my expectations. Very happy!',
    date: '10 months ago',
    color: 'bg-sky-100 text-sky-600',
  },
  {
    name: 'Ramesh Singh',
    rating: 5,
    text: 'Expert care at affordable price. Dr. Singh is truly the best.',
    date: '3 months ago',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    name: 'Jyoti Pandey',
    rating: 5,
    text: 'Nice environment and very good treatment. Staff behavior is very kind.',
    date: '1 month ago',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    name: 'Rahul Rawat',
    rating: 5,
    text: 'Top dental clinic. My dental implant was a big success.',
    date: '6 months ago',
    color: 'bg-rose-100 text-rose-600',
  },
  {
    name: 'Shashi Devi',
    rating: 5,
    text: 'Satisfactory work and friendly doctor. Recommend for everyone.',
    date: '4 months ago',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    name: 'Om Prakash',
    rating: 5,
    text: 'Very helpful and professional team. Thank you Singh dental clinic.',
    date: '2 months ago',
    color: 'bg-teal-100 text-teal-600',
  },
  {
    name: 'Kavita Kandpal',
    rating: 5,
    text: 'Best doctor and best staff. hygienic environment and great results.',
    date: '8 months ago',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    name: 'Sanjay Arya',
    rating: 5,
    text: 'Great experience. Dr. Singh is very skilled and humble.',
    date: '3 weeks ago',
    color: 'bg-fuchsia-100 text-fuchsia-600',
  },
  {
    name: 'Meena Negi',
    rating: 5,
    text: 'Very satisfied with the pediatric care provided for my son.',
    date: '5 months ago',
    color: 'bg-cyan-100 text-cyan-600',
  },
  {
    name: 'Harish Joshi',
    rating: 5,
    text: 'Singh Dental Clinic is the best place for complex extractions.',
    date: '1 year ago',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'Pooja Bisht',
    rating: 5,
    text: 'The treatment cost is very reasonable and quality is superior.',
    date: '2 months ago',
    color: 'bg-green-100 text-green-600',
  },
  {
    name: 'Rakesh Pandey',
    rating: 5,
    text: 'Professional and courteous. The entire team is highly recommended.',
    date: '4 months ago',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    name: 'Sunita Rawat',
    rating: 5,
    text: 'I got my dental fillings here and they are perfect.',
    date: '6 months ago',
    color: 'bg-sky-100 text-sky-600',
  },
  {
    name: 'Amit Sharma',
    rating: 5,
    text: 'Best dental clinic in Uttarakhand with advanced modern techniques.',
    date: '1 month ago',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    name: 'Deepa Bisht',
    rating: 5,
    text: 'Friendly atmosphere and very clean clinic. Dr. Singh is amazing.',
    date: '3 months ago',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    name: 'Vijay Koranga',
    rating: 5,
    text: 'Expert treatment and reliable care. Best in Ramnagar.',
    date: '5 months ago',
    color: 'bg-rose-100 text-rose-600',
  },
  {
    name: 'Laxmi Devi',
    rating: 5,
    text: 'Very satisfied with the invisalign result. My teeth look great.',
    date: '2 months ago',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    name: 'Bhupesh Pant',
    rating: 5,
    text: 'Dr. Singh is very polite and experienced. Great facilities.',
    date: '4 months ago',
    color: 'bg-teal-100 text-teal-600',
  },
  {
    name: 'Sarita Rawat',
    rating: 5,
    text: 'Clean surroundings and soft spoken staff. treatment was excellent.',
    date: '8 months ago',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    name: 'Rajinder Kumar',
    rating: 5,
    text: 'I am taking my family here for years. Best for all ages.',
    date: '1 month ago',
    color: 'bg-fuchsia-100 text-fuchsia-600',
  },
  {
    name: 'Kamal Saini',
    rating: 5,
    text: 'Quick and professional. appointment system is very smooth.',
    date: '5 months ago',
    color: 'bg-cyan-100 text-cyan-600',
  },
  {
    name: 'Suraj Rawat',
    rating: 5,
    text: 'Impressive results for my crown and bridge work.',
    date: '3 weeks ago',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'Neema Devi',
    rating: 5,
    text: 'The best dental hospital for elderly patients. Patient and kind.',
    date: '7 months ago',
    color: 'bg-green-100 text-green-600',
  },
  {
    name: 'Gopal Rawat',
    rating: 5,
    text: 'Modern tech and skilled hands. Best experience in Ramnagar.',
    date: '2 months ago',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    name: 'Indira Sharma',
    rating: 5,
    text: 'High level of sterilization. Very professional environment.',
    date: '4 months ago',
    color: 'bg-sky-100 text-sky-600',
  },
  {
    name: 'Pushpa Koranga',
    rating: 5,
    text: 'Best dentist for RCT. I felt no discomfort at all.',
    date: '6 months ago',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    name: 'Naveen Bhatt',
    rating: 5,
    text: 'Expert care, hygienic clinic and friendly staff. 5 stars!',
    date: '1 month ago',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    name: 'Pankaj Mehra',
    rating: 4,
    text: 'Treatment was good but wait time was a bit long. Overall satisfied.',
    date: '1 week ago',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'Suresh Negi',
    rating: 4,
    text: 'Very professional doctors. The clinic is easy to find and very clean.',
    date: '3 weeks ago',
    color: 'bg-green-100 text-green-600',
  },
  {
    name: 'Anita Joshi',
    rating: 3,
    text: 'Decent experience. The treatment was okay, but I felt the staff could be more communicative.',
    date: '1 month ago',
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    name: 'Rohit Chand',
    rating: 3,
    text: 'Average service. The procedure was fine but the billing process took too much time.',
    date: '2 months ago',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    name: 'Tanya Sah',
    rating: 2,
    text: 'Not very happy with the scheduling. My appointment was cancelled twice without much notice.',
    date: '3 months ago',
    color: 'bg-red-100 text-red-600',
  },
  {
    name: 'Vikram Singh',
    rating: 1,
    text: 'Had to wait for 2 hours even with an appointment. Very frustrating experience.',
    date: '5 months ago',
    color: 'bg-rose-100 text-rose-600',
  },
];

export default function PatientReviewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterRating, setFilterRating] = useState('all');
  const reviewsPerPage = 27;

  const sortedReviews = useMemo(() => {
    const getWeight = (date) => {
      const d = date.toLowerCase();
      if (d.includes('week')) return parseInt(d) * 7;
      if (d.includes('month')) return parseInt(d) * 30;
      if (d.includes('year')) return parseInt(d) * 365;
      if (d.includes('2024')) return 400;
      return 1000;
    };
    return [...REVIEWS].sort((a, b) => getWeight(a.date) - getWeight(b.date));
  }, []);

  const filteredReviews = useMemo(() => {
    if (filterRating === 'all') return sortedReviews;
    return sortedReviews.filter((review) => review.rating === parseInt(filterRating));
  }, [filterRating, sortedReviews]);

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (rating) => {
    setFilterRating(rating);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header transparent={false} />

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20 mt-16">
        {/* Back Link */}
        <Link
          href="/patient-stories"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-8 group"
        >
          <Icon
            name="ArrowLeftIcon"
            size={18}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to Patient Stories
        </Link>

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-sky-50 border border-sky-100">
            <Icon name="StarIcon" size={16} className="text-sky-500" variant="solid" />
            <span className="font-body text-sm font-medium text-sky-700">Google Verified</span>
          </div>
          <h1 className="font-headline text-[clamp(1.5rem,6vw,3.5rem)] font-bold text-text-primary mb-4">
            Patient Reviews
          </h1>
          <p className="font-body text-base md:text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Real experiences from people who trusted us with their smiles. Join hundreds of
            satisfied patients at Singh Dental Clinic.
          </p>

          {/* Rating Filter */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
            {['all', '5', '4', '3', '2', '1'].map((rating) => (
              <button
                key={rating}
                onClick={() => handleFilterChange(rating)}
                className={`px-6 py-2 rounded-full font-body text-sm font-medium transition-all duration-300 border ${
                  filterRating === rating
                    ? 'bg-primary text-white border-primary shadow-elevation-md'
                    : 'bg-white text-text-secondary border-gray-200 hover:border-primary hover:text-primary'
                }`}
              >
                {rating === 'all' ? 'All Reviews' : `${rating} Stars`}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-[600px]">
          <AnimatePresence mode="wait">
            {currentReviews.map((review, index) => (
              <motion.div
                key={`${review.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: (index % 9) * 0.05 }}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-elevation-sm border border-gray-100 flex flex-col h-full hover:shadow-elevation-md transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${review.color} shrink-0`}
                  >
                    <Icon name="UserIcon" size={24} variant="solid" />
                  </div>
                  <div>
                    <h3 className="font-headline font-semibold text-text-primary">{review.name}</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="StarIcon"
                          size={14}
                          className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                          variant="solid"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="font-body text-text-secondary text-sm md:text-base leading-relaxed mb-4 flex-grow italic">
                  &quot;{review.text}&quot;
                </p>

                <div className="text-xs text-text-secondary font-medium">{review.date}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12 md:mt-16">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border transition-all ${
                currentPage === 1
                  ? 'opacity-30 cursor-not-allowed border-gray-100'
                  : 'border-gray-200 hover:border-primary text-text-secondary hover:text-primary'
              }`}
            >
              <Icon name="ChevronLeftIcon" size={20} />
            </button>

            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                // Simple logic to show current, first, last and neighbors
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 rounded-lg font-body font-medium transition-all ${
                        currentPage === pageNum
                          ? 'bg-primary text-white shadow-elevation-sm'
                          : 'text-text-secondary hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                  return (
                    <span key={pageNum} className="text-gray-400">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border transition-all ${
                currentPage === totalPages
                  ? 'opacity-30 cursor-not-allowed border-gray-100'
                  : 'border-gray-200 hover:border-primary text-text-secondary hover:text-primary'
              }`}
            >
              <Icon name="ChevronRightIcon" size={20} />
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 p-8 md:p-12 rounded-3xl bg-primary text-white text-center shadow-elevation-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <h2 className="font-headline text-2xl md:text-3xl font-bold mb-4">
              Care that brings out the best in you
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Dr. Pradeep Singh and his team are dedicated to providing the most comfortable dental
              experience in Ramnagar.
            </p>
            <Link
              href="/book-appointment"
              className="inline-flex px-8 py-4 bg-white text-primary rounded-xl font-bold hover:scale-105 transition-transform shadow-elevation-md"
            >
              Book Your Appointment
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
