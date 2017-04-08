/* jslint todo: true */
/* jslint xxx: true */
/* jshint -W100 */
'use strict';

angular.module('myDashboardApp')
//

.config(function($translateProvider) {
    $translateProvider
    //
    .translations('fa', {
	'Dashboard': 'داشبور',
	'Applications': 'نرم‌افزارها',
	'Account': 'حساب کاربری',
	'Profile': 'پروفایل‌ها',
	'Users': 'کاربران',
	'Groups': 'گروه‌ها',
	'Roles': 'نقش‌ها',
	'Problems': 'مشکلات',
	'Zones': 'منطقه‌ها',
	'Networks': 'شبکه‌ها',
	'Devices': 'دستگاه‌ها',
	'Model': 'مدل',
	'Color': 'رنگ',
	'Workshops': 'کارگاه‌ها',
	'Requests': 'تقاضاها',
	'Actions': 'اکشن‌ها',
	'Tenant': 'ملک',
	'Input value': 'مقدار ورودی',
	
	'Search': 'جستجو',
	
	'message': 'پیام و یا توضیحات',
	'set zone': 'تعیین منطقه',
	'set fixer': 'تعیین تعمیرکار',
	'remote consultant': 'مشاوره تلفنی',
	'incomplete info': 'اطلاعات ناقص',
	'schadule': 'تعیین زمان و مکان',
	'fixed': 'تعمیر شد',
	'impossilbe to fix': 'تعمییر ممکن نیست',
	'set workshop': 'تعیین کارگاه',
	'accept': 'دریافت گوشی',
	'start to fix': 'آغاز تعمیر',
	'need more time': 'نیاز به زمان بیشتر',
	'give back': 'ارسال به مشتری',
	'close': 'بستن',
	'reopen': 'باز کردن',
	'archive': 'بایگانی',
	'report': 'گزارش',
	
	'app.update.message': 'نسخه جدید نصب شده است، دوباره لود کنید.',
    });
    $translateProvider.preferredLanguage('fa');
});
