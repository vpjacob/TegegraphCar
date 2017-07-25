//
//  JJHtmlListener.h
//  Tachograph
//
//  Created by 刘毅 on 2017/6/28.
//  Copyright © 2017年 vpjacob. All rights reserved.
//

#import <Foundation/Foundation.h>
@class APIWidgetContainer;

@interface JJHtmlListener : NSObject
+(instancetype)manager;
- (APIWidgetContainer *)getAPIWidgetContainer;

@end
