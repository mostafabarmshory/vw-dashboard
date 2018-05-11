/* 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2016 weburger
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
'use strict';

angular.module('myDashboardApp')


.config(function($translateProvider) {
	$translateProvider
	//
	.translations('fa', {

		'loading configuration': 'دریافت تنظیمات',
		'fetch configuration document': 'دریافت سند حاوی تنظیمات',
		'fetch configuration content': 'دریافت محتوای سند تنظیمات',
		'application configuration loaded successfully': 'تنظیمات با موفقیت دریافت شد',
		'loading user info': 'دریافت اطلاعات کاربری',
		'fetch user information': 'دریافت اطلاعات کاربری',
		'user information loaded successfully': 'اطلاعات کاربری با موفقیت دریافت شد',
		'check user permissions': 'بررسی دسترسی‌ها',
		
		'Search': 'جستجو',
		'Log out': 'خروج',

		'Dashboard': 'داشبور',
		'Account': 'حساب کاربری',
		'Profile': 'پروفایل‌ها',

		'User management' : 'مدیریت کاربران',
		'Users': 'کاربران',
		'Groups': 'گروه‌ها',
		'Roles': 'نقش‌ها',
		'New user': 'ایجاد کاربر جدید',
		'New group': 'ایجاد گروه جدید',
		'New role': 'ایجاد نقش جدید',

		'Content management': 'مدیریت محتوا',
		'Contents': 'محتوا',
		'New Content': 'ایجاد محتوای جدید',

		'Spa management': 'مدیریت اپلیکیشن‌ها',
		'Applications': 'اپلیکیشن‌ها',
		'spas': 'اپلیکیشن‌ها',
		'Upload spa': 'بارگزاری اپلیکیشن جدید',
		'Repository': 'مخزن اپلیکیشن‌ها',

		'Bank management': 'مدیریت درگاه‌های بانکی',
		'Bank gates': 'درگاه‌های بانکی',

		'Discount management': 'مدیریت تخفیف‌ها',
		'Discounts': 'تخفیف‌ها',
		'New Discount': 'ایجاد تخفیف جدید',
		'New discount': 'ایجاد تخفیف جدید',

		'Tenant': 'تارنما',
		'Tenant Info': 'اطلاعات تارنما',
		'Tickets': 'درخواست‌ها',
		'Invoices': 'صورتحساب‌ها',

		'User': 'کاربر',

		'Problems': 'مشکلات',
		'Zones': 'منطقه‌ها',
		'Networks': 'شبکه‌ها',
		'Devices': 'دستگاه‌ها',
		'Model': 'مدل',
		'Color': 'رنگ',
		'Workshops': 'کارگاه‌ها',
		'Requests': 'تقاضاها',
		'Actions': 'اکشن‌ها',
		'Input value': 'مقدار ورودی',

		'ID': 'شناسه',
		'Login': 'لاگین',
		'EMail': 'پست الکترونیکی',
		'Edit': 'ویرایش',
		'Save': 'ذخیره',
		'Cancel': 'انصراف',
		'Restore': 'بازیابی',
		'Password': 'گذرواژه',
		'Confirm': 'تایید',

		'Summary': 'خلاصه',
		'Phone': 'شماره تماس',
		'Mobile': 'شماره همراه',
		'LinkedId': 'لینکدین',
		'Telegram': 'تلگرام',
		'Whatsapp': 'واتساپ',
		'Contacts': 'تماس‌ها',
		'User avatar': 'اواتار کاربری',
		'Socials': 'شبکه‌های اجتمائی',

		'Settings': 'تنظیمات',
		'Setting' : 'تنظیم',

		'Theme': 'نمایه',
		'Themes': 'نمایه‌ها',
		'default':'پیش فرض',
		'gray': 'خاکستری',
		'red': 'قرمز',
		'dark': 'تیره',

		'Local': 'منطقه',
		'Language': 'زبان',
		'Direction': 'جهت',
		'Right to left': 'راست به چپ',
		'Left to right': 'چپ به راست',

		'Persian': 'فارسی',
		'English': 'انگلیسی',
		'Enable navbar': 'فعال کردن نوار ابزار',

		'Messages': 'پیام‌ها',
		'message': 'پیام',

		'app.update.message': 'نسخه جدید نصب شده است، دوباره لود کنید.',
	});
	$translateProvider.preferredLanguage('fa');
});
